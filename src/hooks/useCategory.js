import { useSelector } from 'react-redux'

/** @returns {typeof import("./../domain/entities/category").default} */
export default function useCategory() {
    return useSelector((store) => store.entities.category);
}