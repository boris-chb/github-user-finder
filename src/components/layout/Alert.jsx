const Alert = (props) => {
  const { alert, setAlert } = props;

  const clearAlert = () => {
    setAlert();
  };

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
        <i onClick={clearAlert} className="fas fa-times-circle" />
      </div>
    )
  );
};

export default Alert;
