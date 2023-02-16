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

  export const addDestination = (destination) => {
    return {
      type: 'ADD_DESTINATION',
      payload:destination
    };
  }; 


  