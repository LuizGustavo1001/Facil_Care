export function useAge() {

    /**
    * Return patient age
    *
    * @param { Date } birthDate - Patient birth date
    **/
    const getAge = (birthDate) => {
        console.log(birthDate)
        const today = new Date()

        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDifference = today.getMonth() - birthDate.getMonth()

        if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < today.getDate())){
            age--
        }

        return age
    }

    return { getAge }
}