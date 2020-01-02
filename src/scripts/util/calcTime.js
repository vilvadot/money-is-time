const calcTime = (price, rate) => Math.ceil((price / rate) * 10) / 10;

export default calcTime