const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        padding: '10px 20px',
        border: 'solid',
        borderRadius: '5px',
        fontSize: '20px',
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
