import {
  Coordinate2D,
  Coordinate3D,
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
  RawCoordinate2D,
  RawCoordinate3D,
  RawGeometryCollection,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';

export const adaptGeometry2D = (geometry: RawCoordinate2D | RawCoordinate3D): Coordinate2D => ({
  x: geometry[0],
  y: geometry[1],
});

export const adaptGeometry3D = (geometry: RawCoordinate3D): Coordinate3D => ({
  x: geometry[0],
  y: geometry[1],
  z: geometry[2],
});

/** Adapt any type of raw geometry */
export const adaptGeometry = (
  geometry: RawPolygonGeometry | RawLineStringGeometry2D | RawPointGeometry2D,
): PolygonGeometry | LineStringGeometry | PointGeometry => {
  switch (geometry.type) {
    case 'Polygon':
      return adaptPolygonGeometry(geometry);

    case 'LineString':
      return adaptLineString(geometry);

    case 'Point':
      return adaptPoint(geometry);
  }
};

export const adaptPolygonGeometry = (geometry: RawPolygonGeometry): PolygonGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(line => line.map(point => adaptGeometry2D(point))),
});

export const adaptLineString = (geometry: RawLineStringGeometry2D): LineStringGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(point => adaptGeometry2D(point)),
});

export const adaptPoint = (geometry: RawPointGeometry2D): PointGeometry => ({
  type: geometry.type,
  coordinates: adaptGeometry2D(geometry.coordinates),
});

export const extractFirstPointOfGeometry = (
  geometry:
    | RawPolygonGeometry
    | RawLineStringGeometry2D
    | RawPointGeometry2D
    | RawGeometryCollection
    | null,
): Coordinate2D | null => {
  if (geometry === null) return null;
  switch (geometry.type) {
    case 'Polygon':
      return adaptGeometry2D(geometry.coordinates[0][0]);

    case 'LineString':
      return adaptGeometry2D(geometry.coordinates[0]);

    case 'Point':
      return adaptGeometry2D(geometry.coordinates);

    case 'GeometryCollection':
      return extractFirstPointOfGeometry(geometry.geometries[0]);
  }
};

export function flattenMultiLineStringCoordinates<T>(coordinates: T[][]): T[] {
  return coordinates.reduce<T[]>(
    (reducedInLineCoordinates, currentLine) => [...reducedInLineCoordinates, ...currentLine],
    [],
  );
}
