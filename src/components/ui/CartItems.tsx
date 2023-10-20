import { useDeleteCartMutation } from "@/redux/api/cartApi";
import { AiFillDelete } from "react-icons/ai";

export default function CartItems({ items }: any) {
  const [removeFromCart] = useDeleteCartMutation();

  return (
    <div>
      {items?.length ? (
        items?.map((item: any) => (
          <div key={item?._id} className="flex items-center justify-between">
            <h3>
              <span className="font-bold">{item?.service?.title} </span>-{" "}
              {item?.service?.price}
            </h3>
            <button
              onClick={() => removeFromCart(item?._id)}
              className="btn btn-xs btn-circle btn-error"
            >
              <AiFillDelete className="text-lg" />
            </button>
          </div>
        ))
      ) : (
        <span>It&apos;s empty</span>
      )}
    </div>
  );
}