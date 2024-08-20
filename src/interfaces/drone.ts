export type Coordinates = {
  x: number;
  y: number;
};

export type DroneState = {
  position: Coordinates;
  isCrashed: boolean;
  speed: Coordinates;
};
