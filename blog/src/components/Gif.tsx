/** @jsx jsx */
import { jsx, ImageProps } from "theme-ui"

const Gif = (props: ImageProps) => {
  return (
    <div sx={{
      textAlign: "center",
      marginTop: "20px",
      marginBottom: "20px",
    }}>
      <img
        className="gatsby-resp-image-image" 
        src={props.src}
        sx={{
          maxWidth: "100%",
        }} 
        {...props} 
      />
      {props.title && (
        <p sx={{
          marginTop: 0,
          color: "#727272",
        }}>{props.title}</p>
      )}
    </div>
  )
}

export default Gif;
