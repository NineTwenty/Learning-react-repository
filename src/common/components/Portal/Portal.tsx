import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
}

export default function Portal({ children, container }: PortalProps) {
  return typeof window !== 'undefined'
    ? createPortal(children, container || document.body)
    : null;
}
