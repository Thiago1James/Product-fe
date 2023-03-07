import MediaCard from "../components/MediaCard";
import * as React from "react";
import productsService from "../config/service/productsService";

export default function Admin() {
  const [products, setProduct] = React.useState();
  const [count, setCount] = React.useState();
  const [Page, serPage] = React.useState();
  const [refresh, setRefresh] = React.useState();

  const handlePage = (e, value) => {
    serPage(value);
  };
  React.useEffect(() => {
    (async () => {
      const res = await productsService.findAll(Page);
      setProduct(res.rows);
      setCount(Number(res.Total.count));
    })();
  }, [Page, refresh]);

  return (
    <>
      <MediaCard
        info={products && products}
        count={count}
        handlePage={handlePage}
        page={Page}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
}
