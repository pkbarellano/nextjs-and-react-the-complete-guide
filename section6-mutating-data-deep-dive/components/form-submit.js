"use client";

import { useActionState } from "react";

export default function FormSubmit({ formAction }) {
    const { pending, errors } = useActionState(formAction);

    if (pending) {
        return <p>Creating post...</p>;
    }

    return <>
        <button type="reset">Reset</button>
        <button>Create Post</button>
    </>;
};