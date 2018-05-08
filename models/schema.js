class VehicleSchema {
  constructor() {
    this.fields = {
      number: {
        type: String
      },
      type: {
        type: String
      },
      year_of_manufacture: {
        type: String
      },
      model: {
        type: String
      }
    }
  }
}

class DriverSchema {
  constructor() {
    this.fields = {
      driving_license: {
        type: String
      },
      licence_expiry: {
        type: String
      },
      status: {
        type: String
      },
      user: {
        type: String
      },
      vehicle: {
        type: String
      },
      wallet_amount:{
        type: Number,
        decimal: true
      }
    }
  }
}

class RiderSchema {
  constructor() {
    this.fields = {
      user: {
        type: String
      },
      wallet_amount:{
        type: Number,
        decimal: true
      }
    }
  }
}

class SettingsSchema {
  constructor() {
    this.fields = {
      country: {
        type: String
      },
      currency: {
        type: String
      },
      language: {
        type: Array
      },
      booking: {
        type: String
      }
    }
  }
}

class FareSchema {
  constructor() {
    this.fields = {
      city: {
        type: String
      },
      car_type: {
        type: String
      },
      tax_percentage: {
        type: Number,
        decimal: false
      },
      base_fare: {
        type: Number,
        decimal: false
      },
      base_km: {
        type: Number,
        decimal: false
      },
      rate_per_min: {
        type: Number,
        decimal: true,
        precision: 4
      },
      additional_rate_per_km: {
        type: Number,
        decimal: false
      },
      waiting_fare_per_min: {
        type: Number,
        decimal: false
      },
      grace_time:{
        type: Number,
        decimal: false
      },
      admin_commission: {
        type: Number,
        decimal: false
      },
      status: {
        type: String
      },
      cancellation_fee: {
        type: Number,
        decimal: false
      },
      id: {
        type: String
      }
    };
  }
}

class PromocodeSchema {
  constructor() {
    this.fields = {
      promo_name: {
        type: Object
      },
      promo_code: {
        type: String
      },
      promo_description: {
        type: Object
      },
      promo_image: {
        type: String
      },
      car_type: {
        type: String
      },
      promo_type: {
        type: String
      },
      promo_value: {
        type: String
      },
      user: {
        type: String
      },
      start_date: {
        type: Date
      },
      end_date: {
        type: Date
      },
      status: {
        type: String
      },
      dispatch_date: {
        type: Date
      }
    }
  }
}

class SurgepriceSchema {
  constructor() {
    this.fields = {
      city: {
        type: String
      },
      to_date: {
        type: Date
      },
      from_date: {
        type: Date
      },
      type: {
        type: String
      },
      status: {
        type: String
      }
    }
  }
}

class TransactionSchema {
  constructor() {
    this.fields = {
      rider: {
        type: String
      },
      ride: {
        type: Array
      },
      transaction_type: {
        type: Array
      },
      amount: {
        type: Number,
        decimal: true
      }
    }
  }
}

module.exports = {
  VehicleSchema: VehicleSchema,
  DriverSchema: DriverSchema,
  RiderSchema: RiderSchema,
  FareSchema: FareSchema,
  SettingsSchema: SettingsSchema,
  PromocodeSchema: PromocodeSchema,
  SurgepriceSchema: SurgepriceSchema,
  TransactionSchema: TransactionSchema
};
