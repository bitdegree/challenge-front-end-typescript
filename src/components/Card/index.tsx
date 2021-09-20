import { Link } from "react-router-dom";
import "./card.css";

interface PostProps {
  id: number;
  title: string;
  body: string;
}

const Card = (props: PostProps) => {
  const { id, title, body } = props;
  return (
    <div className="postCard">
      <h2>{title}</h2>
      <p>
        {body.substring(0, 100)}...
        <Link className="linkToPost" to={`/posts/${id}`}>
          Read more
        </Link>
      </p>
    </div>
  );
};

export default Card;
