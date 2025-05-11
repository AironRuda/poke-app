import { IPokemonType } from "../utils/typesMap";

const FilterTypeBadgeOption = ({
  badgeInfo,
  onClick,
  isSelected,
}: {
  badgeInfo: IPokemonType;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <li
      className={`badge ${badgeInfo.color}${
        isSelected ? "-badge  scale-110 border-4" : ""
      }  text-black `}
      onClick={onClick}
    >
      <img src={badgeInfo.image} alt={badgeInfo.name} />
      {badgeInfo.name}
    </li>
  );
};

export default FilterTypeBadgeOption;
