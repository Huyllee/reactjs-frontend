class CommonUtils {
    static getBase64(file) {
        return new Promise((resolse, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolse((reader.result));
            reader.onerror = (error) => reject(error)
        })
    }
}

export default CommonUtils;