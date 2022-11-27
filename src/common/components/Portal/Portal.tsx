import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
}

export default function Portal({
  children,
  container = document.getElementById('root') as Element,
}: PortalProps) {
  return createPortal(children, container);
}
