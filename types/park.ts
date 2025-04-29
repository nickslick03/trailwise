export interface Rules {
  area_where_camping_is_prohibited: string;
  camping_regulations: string;
  cooking_regulations: string;
  hiking_camping_permit_needed: boolean;
  limits_on_consecutive_nights_camping: number;
  maximum_group_size: number;
  proper_disposal_of_human_waste: string;
  trail_specific_regulation: string;
  water_protection_regulations: string;
}

export interface Park {
  image: string;
  park: string;
  latitude: number;
  longitude: number;
  name: string;
  rules: Rules;
  link_url: string;
  text: string;
  trail_association: string;
}
