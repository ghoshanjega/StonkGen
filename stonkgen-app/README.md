## Setup

`yarn`

## Start

`yarn start`

## State

I wanted to showcase mainly redux as I've used React Context, useState and other hooks to manage state in the other SG projects. I used [redux toolkit](https://github.com/reduxjs/redux-toolkit) to save a bit of time writing boiler plate code. Bootstrap for desing with minimal extra css. Jest, Enzyme for testing. 

### Authentication page (Additional feature)

Single page for login and signup. Used Formik library in the intention to use Yup for validation, but didnt get around to it. [AuthenticationPage.test](stonkgen-app/src/features/authentication/AuthenticationPage.test.tsx) showcases testing a page with redux store and actions. [AuthenticationSlice.test](stonkgen-app/src/features/authentication/AuthenticationSlice.test.ts) showcases testing redux dispatches. 

### Admin page

A simple page to show all the users on the platoform. I used useState here for a change. 

### Cart page

Shows a list of execution items. [CartItem](stonkgen-app/src/features/cart/CartItem.tsx) shows each item and calls the function defined on parent if there is any change on the component. This dispatches the updateItem and sees if the execution is ready for booking. [CartItem.test](stonkgen-app/src/features/cart/CartItem.test.tsx) showcases testing a component which relies on props for data and event handling.

As for the error in "5 HK" and "11 HK", I return the error from the backend. And proceed to keep the status as "inProgress" by design. I wasn't sure if this should be "rejected". The component is aware that there was an error in the previous execution even when you close the error popup. I dont save the "inProgress" on the backend because it could be possible that the data could not have reached the db. So on refresh, expect the items to go back to prebooking status (ready/not ready).

### Cart History (Additional feature)

 Shows a list of previous cart actions. 

 ### Stockslist
 
 Shows the stocks.json list provided. Supports filtering (additional feature) by order, order trend and amount of items. I've used dispatch functions directly in each component to showcase components that have a shared state dependency and manipulation. Supports Pagination (additional feature) too.

