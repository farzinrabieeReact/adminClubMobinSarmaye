export function discountCode_insert(data) {

        let config = { url: "insert_request" };

        let _data = {
            table: "discountcode",
            method_type: "insert_bulk_discount_code",
            data: data ? data : {}
        }

        return ApiConfig(config, _data)
}