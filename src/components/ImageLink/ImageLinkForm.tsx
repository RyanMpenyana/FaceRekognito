import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
  return (
    <>
      <p className="f3 Center">
        {"This Magic Brain will detect faces in your pictures. Give it a try"}
      </p>
      <div className="Center ">
        <div className="pa4 br3 shadow-5 form">
          <input
            onChange={props.onChange}
            className="f4 pa2 w-70 center "
            type="text"
            value={props.value}
          />
          <button
            onClick={props.onSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};
export default ImageLinkForm;
