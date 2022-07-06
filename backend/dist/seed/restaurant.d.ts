export declare class RestaurantSeed {
    private locations;
    private restaurants;
    private restaurantRepository;
    private restaurantRateRepository;
    private commentRepository;
    constructor(restaurantRepository: any, restaurantRateRepository: any, commentRepository: any);
    private check;
    add(): Promise<void>;
    private getRates;
    private getComments;
}
