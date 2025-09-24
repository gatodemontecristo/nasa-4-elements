type TypeMark = [string, number, number];

type MarkNasa = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

const winds: TypeMark[] = [
  ["Huaycán Zona L", -12.0151464, -76.8125454],
  ["Parque Benavides", -12.0201464, -76.8205454],
  ["Losa Deportiva Zonal H", -12.0251464, -76.8175454],
  ["Cancha Deportiva UCV 91", -12.0181464, -76.8145454],
  ["Mercado Huaycán", -12.0221464, -76.8155454],
  ["Parque Central Huaycán", -12.0171464, -76.8185454],
  ["Colegio San Juan", -12.0241464, -76.8195454],
  ["Centro de Salud Huaycán", -12.0191464, -76.8165454],
  ["Plaza de Armas Huaycán", -12.0211464, -76.8175454],
  ["Iglesia San Francisco", -12.0161464, -76.8135454],
  ["Huaycán Zona A", -12.0131464, -76.8115454],
  ["Huaycán Zona B", -12.0141464, -76.8105454],
  ["Huaycán Zona C", -12.0151464, -76.8095454],
  ["Huaycán Zona D", -12.0161464, -76.8085454],
  ["Huaycán Zona E", -12.0171464, -76.8075454],
  ["Huaycán Zona F", -12.0181464, -76.8065454],
  ["Huaycán Zona G", -12.0191464, -76.8055454],
  ["Huaycán Zona I", -12.0211464, -76.8045454],
  ["Huaycán Zona J", -12.0221464, -76.8035454],
  ["Huaycán Zona K", -12.0231464, -76.8025454],
  ["Huaycán Zona M", -12.0261464, -76.8155454],
  ["Huaycán Zona N", -12.0271464, -76.8165454],
  ["Huaycán Zona O", -12.0281464, -76.8175454],
  ["Huaycán Zona P", -12.0291464, -76.8185454],
  ["Complejo Deportivo Norte", -12.0111464, -76.8195454],
  ["Parque Ecológico", -12.0121464, -76.8205454],
  ["Centro Comunal", -12.0301464, -76.8195454],
  ["Losa Multideportiva", -12.0311464, -76.8205454],
  ["Cancha de Fútbol Sur", -12.0321464, -76.8215454],
  ["Mercado Zonal", -12.0331464, -76.8225454],
  ["Terminal Huaycán", -12.0341464, -76.8235454],
  ["Paradero Principal", -12.0101464, -76.8245454],
  ["Posta Médica", -12.0091464, -76.8255454],
  ["Biblioteca Comunal", -12.0081464, -76.8265454],
  ["Parque Infantil Norte", -12.0071464, -76.8275454],
  ["Campo Deportivo", -12.0061464, -76.8285454],
  ["Centro Educativo", -12.0051464, -76.8295454],
  ["Losa de Usos Múltiples", -12.0041464, -76.8305454],
  ["Parque Recreacional", -12.0351464, -76.8135454],
  ["Cancha Sintética", -12.0361464, -76.8125454],
  ["Comedor Popular", -12.0371464, -76.8115454],
  ["Casa Comunal Norte", -12.0381464, -76.8105454],
  ["Área Verde Central", -12.0391464, -76.8095454],
  ["Mirador Huaycán", -12.0401464, -76.8085454],
  ["Parque de la Amistad", -12.0411464, -76.8075454],
  ["Alameda Principal", -12.0031464, -76.8315454],
  ["Zona Comercial", -12.0021464, -76.8325454],
  ["Mercadillo Norte", -12.0011464, -76.8335454],
  ["Parque Las Flores", -12.0001464, -76.8345454],
  ["Centro de Desarrollo", -12.0421464, -76.8065454],
];

const formatted: MarkNasa[] = winds.map(([name, lat, lng]) => ({
  name,
  lat,
  lng,
  key: JSON.stringify({ name, lat, lng }),
}));

export default formatted;
