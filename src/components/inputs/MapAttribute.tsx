interface MapAttributeProps {
  label: string,
  longitude: number,
  latitude: number
};

const MapAttribute = (props: MapAttributeProps) => {
  const { label, longitude, latitude } = props;

  return (
    <div>
      <h4 className="text-secondary-500 bold-m">{label}</h4>
      
      <div className="my-2 rounded-xl overflow-hidden">
        {longitude && latitude ? (
          <iframe
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          <div className="opacity-50 pointer-events-none">
            <iframe
              src={`https://maps.google.com/maps?q=-6.914744,107.609810&z=15&output=embed`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapAttribute;