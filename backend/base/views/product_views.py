from django.shortcuts import render
from django.http import JsonResponse
from base.products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product, Review
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET', 'DELETE', 'POST', 'PUT'])
def productView(request):
    pk = request.query_params.get('pk')
    type = request.query_params.get('type')
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    user = request.user
    data = request.data

    if type == "getproducts":
        if query == None:
            query = ""
        products = Product.objects.filter(name__icontains=query)
        # here the number of products per page
        paginator = Paginator(products, 5)
        if page == None:
            page = 1
        try:
            products = paginator.page(page)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)
        page = int(page)
        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

    elif type == "getproduct":
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    elif type == "gettop":
        products = Product.objects.filter(
            rating__gte=4).order_by('-rating')[0:5]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif type == "delete":
        if user.is_staff:
            product = Product.objects.get(_id=pk)
            product.delete()
            return Response('Product Deleted')
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    elif type == "create":
        if user.is_staff:
            product = Product.objects.create(
                user=user,
                name='Sample Name',
                price=0,
                brand='Sample Brand',
                countInStock=0,
                category='Sample Category',
                description=''
            )
            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    elif type == "update":
        if user.is_staff:
            if pk != "":
                product = Product.objects.get(_id=pk)
                product.name = data['name']
                product.price = data['price']
                product.brand = data['brand']
                product.countInStock = data['countInStock']
                product.category = data['category']
                product.description = data['description']
                product.save()
                serializer = ProductSerializer(product, many=False)
                return Response(serializer.data)
            else:
                return Response("Not found")
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    elif type == "createreview":
        if user != "AnonymousUser":
            product = Product.objects.get(_id=pk)
            # review already exists
            alreadyExists = product.review_set.filter(user=user).exists()
            if alreadyExists:
                content = {'detail': 'Product already reviewed'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            # no rating or 0
            elif data['rating'] == 0:
                content = {'detail': 'Please select a rating'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            # create review
            else:
                review = Review.objects.create(
                    user=user,
                    product=product,
                    name=user.first_name,
                    rating=data['rating'],
                    comment=data['comment'],
                )
                reviews = product.review_set.all()
                product.numReviews = len(reviews)
                total = 0
                for i in reviews:
                    total += i.rating
                product.rating = total / len(reviews)
                product.save()
                return Response('Review Added')
        else:
            content = {'detail': 'Please Login to write a review'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getProducts(request):
    user = request.user
    # if user.isauthenticated == true:
    #   print("SIIIII")
    if user != "AnonymousUser":
        print("JJAJAJAAJJ")
    elif user == "AnonymousUser":
        print("NONONONO")
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    xd = request.query_params.get('xd')
    print("QUERY:", query)
    print("PAGE:", page)
    print("XD:", xd)
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)  # here the number of products per page
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    if pk != "":
        data = request.data
        product = Product.objects.get(_id=pk)

        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']

        product.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    else:
        return Response("Not found")


@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was Uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    # review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # no rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Review Added')
