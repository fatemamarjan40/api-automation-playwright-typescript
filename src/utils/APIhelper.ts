
export async function formatAPIRequest(template: string, values: any[]): Promise<
string> {
return template.replace(/{(\d+)}/g, (match, p1) => {
const index = parseInt(p1, 10);
return index < values.length? String(values [index]): match;
});
}

// export function formatAPIRequest(template: string, values: (string | number)[]): string {
//   return template.replace(/{(\d+)}/g, (match, p1) => {
//     const index = parseInt(p1, 10);
//     return index < values.length ? String(values[index]) : match;
//   });
// }

// Usage:
// const url = formatAPIRequest("/api/user/{0}/post/{1}", [123, 45]);
// Result: "/api/user/123/post/45"

export async function PostAPIRequestBody(fname: string, lname: string, totalprice: number, depositpaid: boolean,
    additionalneeds: string, checkin: string, checkout: string) {

    const ApiRequest: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        additionalneeds: additionalneeds,
        bookingdates: {
            checkin: checkin,
            checkout: checkout

        }


    }
    return ApiRequest;

}
