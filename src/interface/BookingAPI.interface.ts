interface BookingAPI
{
    
    "firstname": string,
    "lastname": string,
    "totalprice": number,
    "depositpaid": boolean,
    "additionalneeds": string,
    "bookingdates": Bookingdates


}
interface Bookingdates
{
    "checkin": string,
    "checkout": string

}