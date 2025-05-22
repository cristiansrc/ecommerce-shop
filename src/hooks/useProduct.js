import { useSelector } from 'react-redux'

/** @returns {typeof import("./../domain/entities/product").default} */
export default function useProduct() {
    return useSelector((store) => store.entities.product);
}