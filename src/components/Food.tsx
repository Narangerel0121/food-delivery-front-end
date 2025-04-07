import { BASE_URL } from "@/app/constants"

const Food = async () => {
    const response = await fetch(`${BASE_URL}/with-foods`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return (
        <div>
            {data.map((d) => {
                <div>{d.categories.name}</div>
            })}
        </div>
    )
}

export { Food }