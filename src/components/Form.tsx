import { useState } from "react"

interface FormFields {
    item: string,
    price: number
}

const defaultFormData: FormFields = {
    item: "",
    price: 0
}

export const Form = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const { item, price } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => 
            ({ ...prevState,
                [e.target.id]: e.target.value
            })
        )
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)

        setFormData(defaultFormData);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="item">Item</label>
            <input type="text" id="item" value={item} onChange={onChange} />
            <br />
            <br />
            <label htmlFor="price">Price</label>
            <input type="number" id="price" value={price} onChange={onChange} />
            <br />
            <br />
            <button type="submit">Add</button>
        </form>
    );
}