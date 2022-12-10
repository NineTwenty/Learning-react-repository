import { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import styles from './InfiniteScrollReverse.module.css';

// Action Creators
const finishInitialization = () => ({
  type: 'INITIALIZATION_FINISH' as const,
});

const startLoading = () => ({
  type: 'LOADING_STARTED' as const,
});

const finishLoading = (itemsAmount: number) => ({
  type: 'LOADING_FINISH' as const,
  payload: {
    itemsAmount,
  },
});

const updateItemsAmount = (itemsAmount: number) => ({
  type: 'ITEMS_CHANGED' as const,
  payload: {
    itemsAmount,
  },
});

const bottomTriggered = (isIntersecting: boolean) => ({
  type: 'BOTTOM_TRIGGERED' as const,
  payload: {
    isIntersecting,
  },
});

interface InfiniteScrollState {
  isLoading: boolean;
  isInitialized: boolean;
  isStickToBottom: boolean;
  nextPage: number;
  itemsAmount: number;
}

type ActionTypes =
  | ReturnType<typeof finishInitialization>
  | ReturnType<typeof startLoading>
  | ReturnType<typeof finishLoading>
  | ReturnType<typeof updateItemsAmount>
  | ReturnType<typeof bottomTriggered>;

// Reducer
const reducer = (state: InfiniteScrollState, action: ActionTypes) => {
  const { isLoading, nextPage, isInitialized } = state;

  switch (action.type) {
    case 'INITIALIZATION_FINISH':
      return { ...state, isInitialized: true };

    case 'LOADING_STARTED':
      return isLoading ? state : { ...state, isLoading: true };

    case 'LOADING_FINISH':
      return isLoading || !isInitialized
        ? {
            ...state,
            isLoading: false,
            nextPage: nextPage + 1,
            itemsAmount: action.payload.itemsAmount,
          }
        : state;

    case 'ITEMS_CHANGED':
      return { ...state, itemsAmount: action.payload.itemsAmount };

    case 'BOTTOM_TRIGGERED':
      return { ...state, isStickToBottom: action.payload.isIntersecting };

    default:
      return state;
  }
};

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  loadMore: (page: number) => void;
}

// Component
function InfiniteScrollReverse(props: InfiniteScrollProps) {
  const { children, loadMore, hasMore } = props;

  const initialState: InfiniteScrollState = {
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
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef<Element | undefined>(undefined);

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
    if (isLoading && topRef.current?.nextElementSibling) {
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
  const observer = useRef<IntersectionObserver | undefined>(undefined);
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create observer as final part of initialization
    if (isInitialized) {
      const options = {
        root: rootRef.current?.parentElement,
        margin: '10px',
      };

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
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
        });
      }, options);

      if (topRef.current) {
        observer.current.observe(topRef.current);
      }

      if (bottomRef.current) {
        observer.current.observe(bottomRef.current);
      }

      return () => {
        observer.current?.disconnect();
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
}

export default InfiniteScrollReverse;
