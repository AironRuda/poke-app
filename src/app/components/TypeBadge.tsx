const TypeBadge = ({ types }: { types: string[] }) => {
  if (types.length === 1) {
    return (
      <div className={`badge bg-${types[0]}-badge`}>
        {types[0].charAt(0).toUpperCase() + types[0].slice(1)}
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      {types.map((type) => {
        return (
          <div key={type} className={`badge bg-${type}-badge`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

export default TypeBadge;
