import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import styles from './InfiniteScrollReverse.module.css';

// Types
const INITIALIZATION_FINISH = 'INITIALIZATION_FINISH';
const LOADING_STARTED = 'LOADING_STARTED';
const LOADING_FINISH = 'LOADING_FINISH';
const ITEMS_CHANGED = 'ITEMS_CHANGED';
const BOTTOM_TRIGGERED = 'BOTTOM_TRIGGERED';

// Action Creators
const finishInitialization = () => ({ type: INITIALIZATION_FINISH });
const startLoading = () => ({ type: LOADING_STARTED });
const finishLoading = (itemsAmount) => ({
  type: LOADING_FINISH,
  payload: { itemsAmount },
});
const updateItemsAmount = (itemsAmount) => ({
  type: ITEMS_CHANGED,
  payload: { itemsAmount },
});
const bottomTriggered = (isIntersecting) => ({
  type: BOTTOM_TRIGGERED,
  payload: { isIntersecting },
});

// Reducer
const reducer = (state, action) => {
  const { isLoading, nextPage, isInitialized } = state;
  const { itemsAmount } = action.payload || state;

  switch (action.type) {
    case INITIALIZATION_FINISH:
      return { ...state, isInitialized: true };

    case LOADING_STARTED:
      return isLoading ? state : { ...state, isLoading: true };

    case LOADING_FINISH:
      return isLoading || !isInitialized
        ? {
            ...state,
            isLoading: false,
            nextPage: nextPage + 1,
            itemsAmount: itemsAmount || 0,
          }
        : state;

    case ITEMS_CHANGED:
      return { ...state, itemsAmount: itemsAmount || 0 };

    case BOTTOM_TRIGGERED:
      const isIntersecting =
        (action.payload && action.payload.isIntersecting) || false;
      return { ...state, isStickToBottom: isIntersecting };

    default:
      return state;
  }
};

// Component
export const InfiniteScrollReverse = (props) => {
  const { children, loadMore, hasMore } = props;

  const initialState = {
    isLoading: false,
    isInitialized: false,
    isStickToBottom: true,
    nextPage: 1,
    itemsAmount: 0,
  };

  // State
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, nextPage, itemsAmount, isInitialized, isStickToBottom } =
    state;

  // Refs
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollAnchor = useRef(null);

  const root = rootRef.current;
  const parent = root ? root.parentElement : undefined;

  const childrenLength = Array.isArray(children) ? children.length : 0;
  const isChildrenChanged = itemsAmount !== childrenLength;

  // Initialization
  useEffect(() => {
    if (!isInitialized) {
      const hasScroll =
        root && parent && root.scrollHeight > parent.clientHeight;

      // Load more items to cause scroll
      // That allow the observer to register intersections
      // And trigger loading of next page
      if (!isInitialized && !hasScroll && hasMore) {
        loadMore(nextPage);
      }

      if (isChildrenChanged) dispatch(finishLoading(childrenLength));

      if (hasScroll) dispatch(finishInitialization());
    }
  });

  // Stick to bottom
  useEffect(() => {
    if (isStickToBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView(false);
    }
  });

  // Fetch data if in loading state
  useEffect(() => {
    if (isLoading && topRef.current) {
      // Save current top item as anchor
      // for scroll position restore

      scrollAnchor.current = topRef.current.nextElementSibling;

      // Fetch next page
      if (hasMore) loadMore(nextPage);
    }
  }, [loadMore, nextPage, isLoading, hasMore]);

  // Handle post-loading
  // and scroll restoring
  useLayoutEffect(() => {
    // True when next page has been loaded
    if (isLoading && isChildrenChanged) {
      if (scrollAnchor.current) {
        // Restore scroll position
        // by scrolling to top of saved anchor
        scrollAnchor.current.scrollIntoView(true);
      }

      // Dispatch loading finish
      // with current amount of items
      dispatch(finishLoading(childrenLength));
    }

    // Update amount of items if new message
    // been received/send.
    // (Should be handled separately because
    // that don't trigger internal isLoading change)
    if (!isLoading && isChildrenChanged) {
      dispatch(updateItemsAmount(childrenLength));
    }
  }, [isLoading, childrenLength, isChildrenChanged]);

  // Setup observer
  const observer = useRef(null);
  useEffect(() => {
    if (observer.current !== null) {
      observer.current.disconnect();
    }

    // Create observer as final part of initialization
    if (isInitialized) {
      const options = {
        root: rootRef.current.parentElement,
        margin: '10px',
      };

      observer.current = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const { isIntersecting } = entry;
          const isTopSentinel = entry.target.classList.contains(
            styles.topSentinel
          );
          const isBottomSentinel = entry.target.classList.contains(
            styles.bottomSentinel
          );

          if (isTopSentinel && isIntersecting) {
            dispatch(startLoading());
          }

          if (isBottomSentinel) {
            dispatch(bottomTriggered(isIntersecting));
          }
        }
      }, options);

      if (topRef.current) {
        observer.current.observe(topRef.current);
      }

      if (bottomRef.current) {
        observer.current.observe(bottomRef.current);
      }

      return () => {
        observer.current.disconnect();
      };
    }
  }, [isInitialized]);

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <div ref={topRef} className={styles.topSentinel} />
      {children}
      <div ref={bottomRef} className={styles.bottomSentinel} />
    </div>
  );
};

export default InfiniteScrollReverse;
