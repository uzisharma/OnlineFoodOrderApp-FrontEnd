import { splitAllNestedArrays } from "../service/genericMethod";
import GenericTable from "./GenericTable";

export default function AssignedDetails({ title, data, error }) {
  const { nested, withoutNested } = splitAllNestedArrays(data);
  // console.log("nested", nested);

  return (
    <div className="assigned-detail">
      <h1>{`Assigned ${title.charAt(0).toUpperCase() + title.slice(1)} `}</h1>
      {error ? (
        <p style={{ color: "red" }}>{`No ${title} is Assigned`}</p>
      ) : (
        <GenericTable title={title} data={withoutNested} nested={nested} />
      )}
    </div>
  );
}
