export const increment = () => {
    return {
      type: 'COUNT_INCRESE',
    };
  };
   
  export const decrement = () => {
    return {
      type: 'COUNT_DECRESE',
    };
  };

  export const changeOrigin = (location) => {
    console.log("pay loc ",location)
    return {
      type: 'CHANGE_ORIGIN',
    };
  };
   
  export const addDestination = () => {
    return {
      type: 'ADD_DESTINATION',
    };
  }; 