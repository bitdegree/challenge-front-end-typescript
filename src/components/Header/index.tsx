import "./header.css";

interface Props {
  pageName: string,
}

const Header = (props: Props) =>{
  return (
    <div className="header">
      <h1>Bitblog</h1>
      <h4 className="headerSubTitle">{props.pageName}</h4>
    </div>
  );
}

export default Header;
