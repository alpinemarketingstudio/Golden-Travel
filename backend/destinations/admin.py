from django.contrib import admin
from .models import (
    Region, Country, TravelType, TravelOption,
    DealCategory, DealOffer, Place,
    TravelDeal, TravelImage, ItineraryDay,
    WishlistItem, Review, Article, FAQ,
    CountryOverview, CountryLearnMoreTopic,
    TravelDealDate,
)

admin.site.register(Region)
admin.site.register(Country)
admin.site.register(TravelType)
admin.site.register(TravelOption)
admin.site.register(DealCategory)
admin.site.register(DealOffer)
admin.site.register(Place)
admin.site.register(TravelDeal)
admin.site.register(TravelImage)
admin.site.register(ItineraryDay)
admin.site.register(WishlistItem)
admin.site.register(Review)
admin.site.register(Article)
admin.site.register(FAQ)
admin.site.register(CountryOverview)
admin.site.register(CountryLearnMoreTopic)
admin.site.register(TravelDealDate)