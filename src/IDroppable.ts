export default interface IDroppable {
  drop(): void;
  readonly dropped: boolean;
}
