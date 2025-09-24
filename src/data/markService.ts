export type TypeMark = [string, string, number, number];

export type MarkNasa = {
  key: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
};

export interface MarkNasaItem {
  type: string;
  id: string;
  marks: MarkNasa[];
}

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
