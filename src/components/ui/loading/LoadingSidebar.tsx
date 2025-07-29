export const LoadingSidebar = () => {
  return (
    <div className="relative overflow-hidden">
      <ul className="flex flex-col space-y-4">
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
        <li className="bg-light-primary rounded-lg p-1.5 w-full h-8 animate-pulse"></li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-light-main-bg dark:from-dark-main-bg to-transparent pointer-events-none"></div>
    </div>
  );
};
