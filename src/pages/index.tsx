import dynamic from 'next/dynamic';

const LazyApp = dynamic(() => import('../App'), { ssr: false });

export default LazyApp;
