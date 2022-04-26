import { useParams } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  
  return(
    <div>
      <h2>Dog id {id} details</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed animi ullam pariatur facere quo saepe, quam officiis, quasi excepturi possimus suscipit totam, quidem reiciendis illo laborum consequuntur dolore exercitationem est!</p>
    </div>

  );
};

export default Details;