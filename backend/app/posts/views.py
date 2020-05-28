''' Post Views'''

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.paginator import Paginator

from . import models, serializers

class PostsView(APIView):
    '''
    All posts
    '''
    # Make endpoint accessible to public
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        ''' 
        Get paginated posts from most recent
        '''

        page = request.query_params.get('page') or 1
        page_size = request.query_params.get('page_size') or 10

        posts = models.Post.objects.all().order_by("-id")
        paginator = Paginator(posts, page_size)
        serializer = serializers.PostSerializer(paginator.page(page), many=True)
        data = serializer.data

        return Response({
            'data':data,
            'page_size': page_size,
            'num_pages': paginator.num_pages,
            'count': paginator.count,
            'page': page
            })

class PostView(APIView):
    '''
    Post
    '''

    # Make endpoint accessible to public
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        '''
        Create a new post
        '''
        serializer = serializers.PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'data':serializer.data
                }
            )
        else:
            return Response(
                {'message': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
