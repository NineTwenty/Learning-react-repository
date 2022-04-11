import { createPortal } from 'react-dom';

const root = document.getElementById('root') as Element;

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
}

export const Portal = ({ children, container = root }: PortalProps) => {
  return createPortal(children, container);
};
