export interface ShowHideProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (show: boolean, data: any) => JSX.Element | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  show: boolean;
}
