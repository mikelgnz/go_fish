import { PointInterface } from '../types/point';

export const checkLimits = (size: PointInterface, position: PointInterface) => {
    return position.x >= 0 && position.x <= size.x && position.y >= 0 && position.y <= size.y;
};