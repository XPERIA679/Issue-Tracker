import { Button } from "@radix-ui/themes";
import { Pagination } from "./components";

export default function Home({ searchParams }: { searchParams: {page: string}}) {
  return (
    // <div>こんにちは世界</div>
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
  );
}
