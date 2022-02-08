import { useRouter } from "next/router";
import useSWR from "swr";

export default function Sub() {
    const router = useRouter()
    console.log(router.query);
    const subName = router.query.sub
    const { data: sub } = useSWR(subName ? `sub/${subName}` : null)
    return (
        <div className="container flex pt-5">
            {JSON.stringify(sub, null, 3)}
        </div>
    )
}