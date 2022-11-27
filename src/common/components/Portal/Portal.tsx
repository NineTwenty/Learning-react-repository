import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
}

export const Portal = ({
  children,
  container = document.getElementById('root') as Element,
}: PortalProps) => createPortal(children, container);
