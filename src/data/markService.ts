export type TypeMark = [string, string, number, number];

// Tipo para el array sin el segundo string (tipo)
export type TypeMarkWithoutType = [string, number, number];

export type MarkNasa = {
  key: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
};
export type MarkNasaWithoutType = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

export interface MarkNasaItem {
  type: string;
  id: string;
  marks: MarkNasa[];
}
export const formattedMap = (collection: TypeMark[]): MarkNasaWithoutType[] =>
  collection.map(([name, , lat, lng]) => ({
    name,
    lat,
    lng,
    key: JSON.stringify({ name, lat, lng }),
  }));
export const formattedMark = (collection: TypeMark[]): MarkNasaItem[] => {
  const arr2 = collection.map(([name, type, lat, lng]) => ({
    name,
    type,
    lat,
    lng,
    key: JSON.stringify({ name, lat, lng }),
  }));

  const ans = arr2.reduce((newObj: MarkNasaItem[], item: MarkNasa) => {
    const dataKey = item.type;
    const existingGroup = newObj.find((el) => el.type === dataKey);
    if (!existingGroup) {
      newObj.push({ type: dataKey, id: item.key, marks: [] });
    }
    newObj.find((el) => el.type === dataKey)?.marks.push(item);
    return newObj;
  }, []);
  return ans;
};

export const removeTypeFromMarks = (
  collection: TypeMark[]
): TypeMarkWithoutType[] => {
  return collection.map(([name, , lat, lng]) => [name, lat, lng]);
};

/**
 * Función alternativa que devuelve solo las coordenadas y nombres
 * @param collection - Array de TypeMark
 * @returns Array con solo nombre y coordenadas
 */
export const getMarkCoordinates = (collection: TypeMark[]) => {
  return collection.map(([name, , lat, lng]) => ({
    name,
    lat,
    lng,
    key: JSON.stringify({ name, lat, lng }),
  }));
};

/**
 * Función que filtra por tipo y luego remueve el tipo del resultado
 * @param collection - Array de TypeMark
 * @param filterType - Tipo a filtrar ("TYPE01" o "TYPE02")
 * @returns Array filtrado sin el tipo
 */
export const filterAndRemoveType = (
  collection: TypeMark[],
  filterType: string
): TypeMarkWithoutType[] => {
  return collection
    .filter(([, type]) => type === filterType)
    .map(([name, , lat, lng]) => [name, lat, lng]);
};
