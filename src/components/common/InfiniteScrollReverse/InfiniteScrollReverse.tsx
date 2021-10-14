import { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import styles from './InfiniteScrollReverse.module.css';

// Types
enum TypeKeys {
  INITIALIZATION_FINISH = 'INITIALIZATION_FINISH',
  LOADING_STARTED = 'LOADING_STARTED',
  LOADING_FINISH = 'LOADING_FINISH',
  ITEMS_CHANGED = 'ITEMS_CHANGED',
  BOTTOM_TRIGGERED = 'BOTTOM_TRIGGERED',
}

// Action types
interface FinishInitializationAction {
  type: TypeKeys.INITIALIZATION_FINISH;
}

interface StartLoadingAction {
  type: TypeKeys.LOADING_STARTED;
}

interface FinishLoadingAction {
  type: TypeKeys.LOADING_FINISH;
  payload: { itemsAmount: number };
}

interface UpdateItemsAmountAction {
  type: TypeKeys.ITEMS_CHANGED;
  payload: { itemsAmount: number };
}

interface BottomTriggeredAction {
  type: TypeKeys.BOTTOM_TRIGGERED;
  payload: { isIntersecting: boolean };
}

// Action Creators
const finishInitialization = (): FinishInitializationAction => ({
  type: TypeKeys.INITIALIZATION_FINISH,
});

const startLoading = (): StartLoadingAction => ({
  type: TypeKeys.LOADING_STARTED,
});

const finishLoading = (itemsAmount: number): FinishLoadingAction => ({
  type: TypeKeys.LOADING_FINISH,
  payload: {
    itemsAmount,
  },
});

const updateItemsAmount = (itemsAmount: number): UpdateItemsAmountAction => ({
  type: TypeKeys.ITEMS_CHANGED,
  payload: {
    itemsAmount,
  },
});

const bottomTriggered = (isIntersecting: boolean): BottomTriggeredAction => ({
  type: TypeKeys.BOTTOM_TRIGGERED,
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
  | FinishInitializationAction
  | StartLoadingAction
  | FinishLoadingAction
  | UpdateItemsAmountAction
  | BottomTriggeredAction;

// Reducer
const reducer = (state: InfiniteScrollState, action: ActionTypes) => {
  const { isLoading, nextPage, isInitialized } = state;

  switch (action.type) {
    case TypeKeys.INITIALIZATION_FINISH:
      return { ...state, isInitialized: true };

    case TypeKeys.LOADING_STARTED:
      return isLoading ? state : { ...state, isLoading: true };

    case TypeKeys.LOADING_FINISH:
      return isLoading || !isInitialized
        ? {
            ...state,
            isLoading: false,
            nextPage: nextPage + 1,
            itemsAmount: action.payload.itemsAmount,
          }
        : state;

    case TypeKeys.ITEMS_CHANGED:
      return { ...state, itemsAmount: action.payload.itemsAmount };

    case TypeKeys.BOTTOM_TRIGGERED:
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
const InfiniteScrollReverse = (props: InfiniteScrollProps) => {
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
};

export default InfiniteScrollReverse;
