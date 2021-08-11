import { connect, styled } from 'frontity';
import { mq } from '../../styles/breakpoints';
import Image from '../images/acf-media';
import Divider from './partials/divider';

const ImageRow = ({ acfData, className }) => {

  return (
    <Images className={`module ${className}`}>
      {acfData.images.map((image, index) => (
        <div className={"image-item"} key={index}>
          {acfData.divider_condition && index !== 0 &&
            <Divider color={acfData.divider.different_color ?
              acfData.divider.divider_color ? "#fff" : "#000"
              : null} />}
          <div className={"image-text"}>
            <Image source={image} />
            {image.caption &&
              <p>{image.caption}</p>
            }
          </div>

        </div>
      ))}
    </Images>
  )
}

export default connect(ImageRow);

const Images = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  .image-item{
    margin: 0 1rem;
    max-width: 7rem;
    position: relative;
    width: 100%;
    flex-grow: 1;
    ${mq("tablet")}{
      margin: 0 2rem;
    }
    p{
      font-size: 0.7em;
      letter-spacing: 1px;
      margin-top: 1rem;
      text-transform: uppercase;
      display: inline-block;
      font-family: "Body Text Bold";
      position: absolute;
      left: 0;
      right: 0;
      ${mq("tablet")}{
        font-size: 0.9em;
      }
    }
  }
  .divider {
    max-width: 100%;
    width: 2rem;
    bottom: 0;
    top: 0;
    left: -2rem;
    position: absolute;
    ${mq("tablet")}{
        left: -3rem;
      }
    .one, .two{
      display: none;
    }
  }
`