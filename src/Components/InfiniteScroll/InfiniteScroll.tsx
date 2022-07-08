import './InfiniteScroll.css';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  showSpinner: boolean;
  onScrollToBottom: () => void;
}

const InfiniteScroll = ({ children, showSpinner, onScrollToBottom }: Props) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      onScrollToBottom();
    }
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      {children}
      {showSpinner && <img src="/spinner.gif" className="spinner" />}
    </div>
  );
};

export { InfiniteScroll };
